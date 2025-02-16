"use client";

import React from "react";
import styles from "./Events.module.css";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("events").select("*");

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEvents = () => {
    if (!hydrated || loading || !events.length) return [];
    return events;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Current Events</h2>
      <div className={styles.eventsList}>
        {events.map((event, index) => (
          <div key={index} className={styles.eventCard}>
            <h3 className={styles.eventTitle}>{event.Title}</h3>
            <p className={styles.eventDate}>{event.description}</p>
            <p className={styles.eventLocation}>Starts {event.start_date}</p>
            <p className={styles.eventDescription}>Rounds: {event.rounds}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
