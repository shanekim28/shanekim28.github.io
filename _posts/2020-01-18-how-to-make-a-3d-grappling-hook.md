---
layout: post
title: How To Make a 3D Grappling Hook with Wrapping in Unity
date: 2020-01-18 09:42:00 +0300
description: Creating a 3D grappling hook # Add post description (optional)
img: how-to-start.jpg # Add image post (optional)
tags: [Programming, Learn] # add tag
---

## Introduction

Many moons ago, I had purchased the game Gunpoint on Steam. As a musician, I was delighted to hear the original sound track was all jazz, my favorite genre. I made a mental note of the game's designers, after which they slowly faded from memory, never to be heard again. Or so I thought.

Two years ago as I was browsing YouTube, I saw a familiar name: Tom Francis. He had a video series from six years ago entitled GHGC, short for what I presume is "Grappling Hook Game Concept." From this video series, I was inspired to create my own grappling hook game concept.

I spent about a week trying to recreate Mr. Francis' grappling hook, and eventually gave up after a lot of trial and error. My logical thinking skills and patience were simply not there. Eventually I returned to the topic, and the light of God shined upon me, unlocking my true potential to complete that concept. The result was... fine. It wasn't anything especially special and had some bugs, but it still felt pretty darn good to use. 

However, I wasn't interested in making 2D games, so I tried to extend my concept into three dimensions. Again, I attempted for about a week, and again, I failed and gave it up. The project was left unfinished until I revisited it just this past week and finally brought my concept into fruition. 

**TL;DR I've been experimenting with this off and on for a while and someone needs to appreciate my incredible hard work and dedication.**

*Strap in, ladies and gents, we're in for a long one.*

## ...And They Say High School Doesn't Teach You Anything

My goal with this concept was to emulate a rope as much as possible, while still maintaining the "gamey" feel to it. It's still partially a physics simulation, but cheats just enough so it doesn't feel TOO real. Because let's face it: reality is boring.

The physics behind the grappling hook are pretty straightforward. When a physics object moves, it has a velocity. If you took high school physics, you'll know that velocity is a vector, meaning it has both direction and magnitude (oh yeahh!!). When an object is in freefall, its velocity vector is straight down. Swinging on a rope is like falling, but spicy. Instead of the velocity vector pointing straight down, the rope constrains the object's downward velocity and redirects it so the object swings.
![Frame 1]({{site.baseurl}}/assets/img/tether-1.png)
![Frame 2]({{site.baseurl}}/assets/img/tether-2.png)
![Frame 3]({{site.baseurl}}/assets/img/tether-3-v2.png)