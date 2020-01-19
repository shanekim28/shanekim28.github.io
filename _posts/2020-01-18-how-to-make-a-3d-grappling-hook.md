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

The physics behind the grappling hook are pretty straightforward. When a physics object moves, it has a velocity. If you took high school physics, you'll remember that velocity is a vector, meaning it has both direction and magnitude (oh yeahh!!). When an object swings from a rope (or grappling hook), it moves along a circular arc. Recall that circular motion occurs if an object's velocity is perpendicular to its radius. Keep this in mind, we'll use it later.

![UCM]({{site.baseurl}}/assets/img/Uniform-cirular-translation.gif)

When an object is in freefall, its velocity vector is straight down. Swinging on a grappling hook is like falling, but spicy. Instead of the velocity vector pointing straight down, the grappling hook constrains the object's downward velocity and redirects it so the object swings. In other words, the velocity is redirected to be solely perpendicular to the grappling hook. Told you we'd use it later.

We can tell how much vertical velocity we need to cancel out by getting the vector dot product bewteen the object's velocity and the direction of the grappling hook. Then, we can cancel out all of the velocity that's going in the opposite direction of the grappling hook, which leaves only the sideways velocity.

![Frame 1]({{site.baseurl}}/assets/img/tether-1.png)
![Frame 2]({{site.baseurl}}/assets/img/tether-2.png)
![Frame 3]({{site.baseurl}}/assets/img/tether-3-v2.png)

This method isn't perfect, however, and will result in some drifting of the object, since it's never truly precise. We can cover up our mistakes by simply resetting the object's position to the maximum length of the grappling hook every frame. *Why not just do this in the first place?* I hear you asking. Great question. Remember: position is different from velocity. If we simply reset the position, the velocity is still maintained, which would result in a huge velocity as time goes on.