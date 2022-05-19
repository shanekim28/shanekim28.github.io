---
layout: post
title: How To Make a 3D Grappling Hook in Unity
date: 2020-01-19 10:04:00 +0300
description: Creating a 3D grappling hook # Add post description (optional)
img: how-to-start.jpg # Add image post (optional)
tags: [Programming, Unity] # add tag
---

#### Introduction

Today, I'm going to be guiding you through the whole process of making a grappling hook in Unity that can wrap and unwrap around objects. From physics to vector projection to mesh edge detection, this is a great project for the aspiring game developer to take a small dive into working through problems logically with Unity as your tool. This project is not for the faint of heart. It requires a creative mind and a willingness to slog through problems.

*Strap in, ladies and gents, we're in for a long one.*

#### Prologue

Many moons ago, I had purchased the game Gunpoint on Steam. As a musician, I was delighted to hear the original sound track was all jazz, my favorite genre. I made a mental note of the game's designers, after which they slowly faded from memory, never to be heard again. Or so I thought.

Two years ago as I was browsing YouTube, I saw a familiar name: Tom Francis. He had a video series from six years ago entitled GHGC, short for what I presume is "Grappling Hook Game Concept." From this video series, I was inspired to create my own grappling hook game concept.

I spent about a week trying to recreate Mr. Francis' grappling hook, and eventually gave up after a lot of trial and error. My logical thinking skills and patience were simply not there. Eventually I returned to the topic, and the light of God shined upon me, unlocking my true potential to complete that concept. The result was... fine. It wasn't anything especially special and had some bugs, but it still felt pretty darn good to use. 

However, I wasn't interested in making 2D games, so I tried to extend my concept into three dimensions. Again, I attempted for about a week, and again, I failed and gave it up. The project was left unfinished until I revisited it just this past week and finally brought my concept into fruition. 

**TL;DR I've been experimenting with this off and on for a while and someone needs to appreciate my incredible hard work and dedication.**

#### ...And They Say High School Doesn't Teach You Anything

My goal with this concept was to emulate a rope as much as possible, while still maintaining the "gamey" feel to it. It's still partially a physics simulation, but cheats just enough so it doesn't feel TOO real. Because let's face it: reality is boring.

The physics behind the grappling hook are pretty straightforward. When a physics object moves, it has a velocity. If you took high school physics, you'll remember that velocity is a vector, meaning it has both direction and magnitude (oh yeahh!!). When an object swings from a rope (or grappling hook), it moves along a circular arc. Recall that circular motion occurs if an object's velocity is perpendicular to its radius. Keep this in mind, we'll use it later.

![UCM]({{site.baseurl}}/assets/img/posts/grappling-hook-part-1/Uniform-cirular-translation.gif)

When an object is in freefall, its velocity vector is straight down. Swinging on a grappling hook is like falling, but spicy. Instead of the velocity vector pointing straight down, the grappling hook constrains the object's downward velocity and redirects it so the object swings. In other words, the velocity is redirected to be solely perpendicular to the grappling hook. In other other words, we're trying to imitate circular motion. Told you we'd use it later.

We can tell how much vertical velocity we need to cancel out by getting the vector dot product bewteen the object's velocity and the direction of the grappling hook. Then, we can cancel out all of the velocity that's going in the opposite direction of the grappling hook, which leaves only the sideways velocity.

![Frame 1]({{site.baseurl}}/assets/img/posts/grappling-hook-part-1/tether-1.png)
![Frame 2]({{site.baseurl}}/assets/img/posts/grappling-hook-part-1/tether-2.png)
![Frame 3]({{site.baseurl}}/assets/img/posts/grappling-hook-part-1/tether-3-v2.png)

This method isn't perfect, however, and will result in some drifting of the object, since it's never truly precise. We can cover up our mistakes by simply resetting the object's position to the maximum length of the grappling hook every frame. *Why not just do this in the first place?* I hear you asking. Great question. Remember: position is different from velocity. If we simply reset the position, the velocity is still maintained, which would result in a huge velocity as time goes on.

Now that we understand how the physics are going to work, let's finally get to coding it!

#### All Day I Dream About Syntax

Let's create a new class and place it on a player object. I'm calling mine GrappleTut.cs. First things first, we want to check if the player presses the spacebar to start grappling. If they do and they're not already grappling to an object, start grappling. Otherwise, stop grappling. This creates a sort of toggle.

```C#
using UnityEngine;

public class GrappleTut : MonoBehaviour {
	private bool tethered = false;

	void Update() {
		if (Input.GetKey(KeyCode.Space)) {
			if (!tethered) {
				BeginGrapple();
			} else {
				EndGrapple();
			}
		}
	}
}
```

Since we're going to be using Unity's physics system, it's a good idea to actually store a reference to the Rigidbody component we want to apply the physics to. Create a private global Rigidbody `rb` and in your `Start()` method, store the player's Rigidbody component.

```C#
Rigidbody rb;
void Start() {
	rb = GetComponent<Rigidbody>();
}
```

Next, we want to actually create the grapple logic. Create the methods `BeginGrapple()` and `EndGrapple()`. `BeginGrapple()` will try to shoot a raycast forward from the player. If the raycast hits something, it will change `tethered` to `true`.

```C#
void BeginGrapple() {
	if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit, Mathf.Infinity)) {
		tethered = true;
	}
}
```

It would also be nice to see how long our tether is. Create a global float `tetherLength` and global Vector3 `tetherPoint` and in your `BeginGrapple()` method, add these lines in the if statement.

```C#
tetherPoint = hit.point;
tetherLength = Vector3.Distance(tetherPoint, transform.position);
```

Your `BeginGrapple()` method should now look like this. Don't worry, I'll also post the full class at the end.

```C#
Vector3 tetherPoint;
float tetherLength;

void BeginGrapple() {
	if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit, Mathf.Infinity)) {
		tethered = true;
		tetherPoint = hit.point;
		tetherLength = Vector3.Distance(tetherPoint, transform.position);
	}
}
```

Great. But what happens when the player wants to stop grappling? Well, that's as easy as setting `tethered` to `false` in your `EndGrapple()` method.

```C#
void EndGrapple() {
	tethered = false;
}
```

As of right now, simply pressing Play in Unity will not do much. All this does is raycast to an object and sets a tether length to the distance between the player and the point it hit. If we want to actually start swinging, we'll need to actually apply the physics mentioned earlier. In Unity, it's important to note that physics changes like to happen at fixed intervals, so we'll use the `FixedUpdate()` method instead of `Update()`. `FixedUpdate()` is framerate independent, meaning that spikes in framerate will not affect the physics. In `FixedUpdate()`, add this line.

```C#
void FixedUpdate() {
	if (tethered) ApplyGrapplePhysics();
}
```

Let's go ahead and write `ApplyGrapplePhysics()` using the physics method we discussed earlier.

```C#
void ApplyGrapplePhysics() {
	Vector3 directionToGrapple = Vector3.Normalize(tetherPoint - transform.position);
	float currentDistanceToGrapple = Vector3.Distance(tetherPoint, transform.position);

	float speedTowardsGrapplePoint = Mathf.Round(Vector3.Dot(rb.velocity, directionToGrapple) * 100) / 100;

	if (speedTowardsGrapplePoint < 0) {
		if (currentDistanceToGrapple > tetherLength) {
			rb.velocity -= speedTowardsGrapplePoint * directionToGrapple;
			rb.position = tetherPoint - directionToGrapple * tetherLength;
		}
	}
}
```

Whew. That was a lot. Let's review what we just did. `directionToGrapple` gets a normalized direction vector from the player to the tether point. `currentDistanceToGrapple` gets, well... the player's current distance to the grapple point. `speedTowardsGrapplePoint` is a little strange. We see that we are indeed getting the dot product of the velocity and the direction (how much the velocity is pointing in the opposite direction of the grapple), but we're also rounding it, multiplying it, and dividing it. This seemingly arbitrary process actually helps with making the rope go slack if it has a small enough velocity at the top of its swing. It rounds the speed off to two decimal places. Remember that we only want to cancel out the velocity if we're moving away from the grapple point, or our speed towards the grapple point is negative. If we didn't round it off, the `speedTowardsGrapplePoint` would always be a really, really small negative number even if the player is at the top of their swing, causing our velocity to be canceled out constantly. I did say we were going to cheat just a little bit.

Next, we only want to cancel out our velocity when the current distance to the grapple point is longer than the actual tether length. We cancel out our velocity in the opposite direction of the direction to the grapple, and reset our position to account for any errors that canceling out velocity did.

#### Summary

And just like that, we're now able to swing from an object! Smash that Play button, press the spacebar when the player is looking at something, and gaze upon your mighty physics-ish creation. If you look carefully, you'll notice that the tether can actually go through objects. As of right now, this system is very rudimentary and unrealistic. In the next part, we will be covering how to wrap around objects. It's a fairly more involved process, so be prepared.

*GrappleTut.cs*
```C#
using UnityEngine;

public class GrappleTut : MonoBehaviour {
	private bool tethered = false;
	private Rigidbody rb;
	private float tetherLength;
	private Vector3 tetherPoint;

	void Start() {
		rb = GetComponent<Rigidbody>();
	}

	void Update() {
		if (Input.GetKey(KeyCode.Space)) {
			if (!tethered) {
				BeginGrapple();
			} else {
				EndGrapple();
			}
		}
	}

	void FixedUpdate() {
		if (tethered) ApplyGrapplePhysics();
	}

	void BeginGrapple() {
		if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit, Mathf.Infinity)) {
			tethered = true;
			tetherPoint = hit.point;
			tetherLength = Vector3.Distance(tetherPoint, transform.position);
		}
	}

	void EndGrapple() {
		tethered = false;
	}

	void ApplyGrapplePhysics() {
		Vector3 directionToGrapple = Vector3.Normalize(tetherPoint - transform.position);
		float currentDistanceToGrapple = Vector3.Distance(tetherPoint, transform.position);

		float speedTowardsGrapplePoint = Mathf.Round(Vector3.Dot(rb.velocity, directionToGrapple) * 100) / 100;

		if (speedTowardsGrapplePoint < 0) {
			if (currentDistanceToGrapple > tetherLength) {
				rb.velocity -= speedTowardsGrapplePoint * directionToGrapple;
				rb.position = tetherPoint - directionToGrapple * tetherLength;
			}
		}
	}
}
```