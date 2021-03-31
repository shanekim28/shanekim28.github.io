---
layout: post
title: "Follow the Whales"
---

##### <span style="color:green">Project Status: Published</span>

##### <span style="color:green">Date Posted: 12/14/2020</span>

<div class="image-container">
    <img src="/assets/img/projects/follow-the-whales/thumb.jpg" class="image">
</div>

<div class="image-container" style="width:50%; margin: 0 auto">
    <a href="https://apps.apple.com/us/app/follow-the-whales/id1542476258?app=itunes&ign-mpt=uo%3D4">
        <img src="/assets/img/projects/follow-the-whales/apple-app-store-icon.png" style="height: 40px"  />
    </a>

    <a href="https://play.google.com/store/apps/details?id=com.sffl.FollowTheWhales">
        <img src="/assets/img/projects/follow-the-whales/google-play-icon.png" style="height: 40px"  />
    </a>

</div>

#### About Stock Stickers

What are big investors doing that you're not? Follow the Whales is a mobile app that lets you know which investors are buying or selling the stocks you're thinking about trading.

#### Features

- Search and save symbols to your watchlist
- Get SEC Filing data
- Get notified when insiders make a trade

#### Development

Follow the Whales was my second freelance project. This project consists of two parts: a Xamarin mobile app and an ASP.NET MVC backend service, paired with Google Firebase for push notifications. I used Azure's app instance and database services to run the backend, with which the frontend communicates.

<div class="image-container">
    <img src="/assets/img/projects/follow-the-whales/ftw-diagram.jpeg" class="image">
</div>

When a user subscribes to get notifications from an investor, the app subscribes the mobile device to a Firebase push notification service and sends a request to the backend to add the investor to the database. This informs a background service to periodically scrape the Security Exchange Commission database and get information on new stock trades. When a new trade is detected, the backend makes a call to the Firebase service to send notifications to all devices subscribed to that investor
