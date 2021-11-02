$(() => {
    var fcmKey = 'AAAAigiA3Q8:APA91bEtbEhpaqZKXRm2fmCAaoZzlbPZU7-BzQBm5gty0evd7OegMUKh8dBbHvj0QwwsTMiGwWIo5DDOLOAoxYskGUa7EvKDbktAgUB9arUnxoxIXgIxpzquey8milNQKnbIvK3fnzJQ';
    var firebaseConfig = {
        apiKey: "AIzaSyClhLYPAJLMf82fp8IWvrAiqIHRo0XT5Sw",
        authDomain: "browser-notification-dc698.firebaseapp.com",
        databaseURL: "https://browser-notification-dc698-default-rtdb.firebaseio.com",
        projectId: "browser-notification-dc698",
        storageBucket: "browser-notification-dc698.appspot.com",
        messagingSenderId: "592848149775",
        appId: "1:592848149775:web:d2457328960ec99653727a",
        measurementId: "G-1WZ7HZ2G39"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const messaging = firebase.messaging();
    messaging.onMessage(function (payload) {
        alert(payload.notification.title);
        
        // notificationElement.innerHTML = notificationElement.innerHTML + " " + payload.data.notification;
    });

    const fbDb      = firebase.database();
    var subscribersRef = fbDb.ref('subscribers');

    var subscribers = [];

    subscribersRef.on('value', (snapshot) => {

        $('#user_list').html('');

        const data = snapshot.val();
        subscribers = [];    
        for (var key in data) {
            var subscriberData = data[key];
            var subscriber = {
                subscriberId: key,
                ...subscriberData
            }

            subscribers.push(subscriber);

            $('#user_list').append(`
                <div class="user text-center">
                    <div class="row">
                        <div class="col-md-3 item">
                            <span class="user-text">${subscriber['name']}</span>
                        </div>
                        <div class="col-md-5 left-border item">
                            <span class="user-text"><i>Subscribed on ${subscriber['time']}</i></span>
                        </div>
                        <div class="col-md-2 left-border item">
                            <span class="user-text">${subscriber['browser']}</span>
                        </div>
                        <div class="col-md-2 item">
                            <button class="btn btn-primary btn_remove" data-id="${subscriber['subscriberId']}">Remove</button>
                        </div>
                    </div>
                </div>
            `);
        }

    });

    $('#user_list').on('click', '.btn_remove', (e) => {
        var ele = e.target;
        var id = $(ele).data('id');

        var r = confirm("Confirm delete!");
        if (r == true) {
            fbDb.ref('subscribers/' + id).set(null);
        }
        
    })

    $('#btn_send').click(() => {
        let notifyBody = $('#notify_body').val();
        if (!notifyBody) {
            alert('Please input notification text');
            return;
        }

        subscribers.forEach(item => {
            let name = item.name;
            notifyBody = notifyBody.replaceAll("{{firstname}}", name);
            sendSMS(item.subscriberId, notifyBody);
        })
    })

    function sendSMS(token, notifyBody) {
        console.log(notifyBody);
        var smsData = {
            to: token,
            notification: {
                "title":notifyBody,
                // "body": notifyBody,
            },
        }
        $.ajax({
            type: 'POST',
            url: "https://fcm.googleapis.com/fcm/send",
            headers: {
                "Authorization":"key=" + fcmKey
            },
            contentType: "application/json",
            data: JSON.stringify(smsData)
        }).done(function(data) { 
            console.log(data);
        });
    }
})