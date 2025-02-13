"use client";

import React from "react";
import styles from "./Events.module.css";

function Events() {
  const events = [
    {
      title: "Rapid tournament",
      date: "Feb 19",
      location: "Room 1705",
      description: "Single Round Robin 10+0",
    },
    {
      title: "Blitz tournament",
      date: "Feb 26",
      location: "Room 1705",
      description: "Double Round Robin 5+0",
    },
    {
      title: "Bullet tournament",
      date: "March 5",
      location: "Room 1705",
      description: "Swiss System 1+2",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Current Events</h2>
      <div className={styles.eventsList}>
        {events.map((event, index) => (
          <div key={index} className={styles.eventCard}>
            <h3 className={styles.eventTitle}>{event.title}</h3>
            <p className={styles.eventDate}>{event.date}</p>
            <p className={styles.eventLocation}>{event.location}</p>
            <p className={styles.eventDescription}>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
