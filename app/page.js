"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Events from "../components/Events";
import { supabase } from "../utils/supabase";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);


  // hydration
  useEffect(() => {
    setHydrated(true);
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .order("blitz_rank", { ascending: true })
        .order("rapid_rank", { ascending: true })
        .order("overall_rank", { ascending: true });

      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };
  


  // There's a champion for each category
  const getChampion = (category) => {
    if (!hydrated || loading || !players.length) return "Loading...";
    switch (category) {
      case "Blitz":
        return players.find((player) => player.blitz_rank === 1)?.name || "N/A";
      case "Rapid":
        return players.find((player) => player.rapid_rank === 1)?.name || "N/A";
      case "Ultimate":
        return players.find((player) => player.overall_rank === 1)?.name || "N/A";
      default:
        return "N/A";
    }
  };

  // Getting players for each category
  const getPlayersForCategory = (category) => {
    if (!hydrated || loading || !players.length) return [];

    let sortedPlayers;
    switch (category) {
      case "Blitz":
        sortedPlayers = [...players].sort((a, b) => a.blitz_rank - b.blitz_rank);
        break;
      case "Rapid":
        sortedPlayers = [...players].sort((a, b) => a.rapid_rank - b.rapid_rank);
        break;
      case "Ultimate":
        sortedPlayers = [...players].sort((a, b) => a.overall_rank - b.overall_rank);
        break;
      default:
        sortedPlayers = [];
    }

    return sortedPlayers.map((player) => player.name);
  };

  if (!hydrated) {
    return <p className={styles.loading}>Loading rankings...</p>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Chess Rankings</h1>
        <p>
          LHSS Chess Club <br />
          Meetings - Every Wednesday at lunch Room 1705 <br />
          Class code - 7zxrcd2
        </p>
      </header>
      <main className={styles.mainContainer}>
        <RankingSection title="Blitz Champion" champion={getChampion("Blitz")} players={getPlayersForCategory("Blitz")} />
        <RankingSection title="Rapid Champion" champion={getChampion("Rapid")} players={getPlayersForCategory("Rapid")} />
        <RankingSection title="Ultimate Champion" champion={getChampion("Ultimate")} players={getPlayersForCategory("Ultimate")} />
      </main>
      <Events />
      <footer className={styles.footer}>
        <p>© 2025 Chess Rankings. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

function RankingSection({ title, champion, players = [] }) {
  return (
    <section className={styles.rankingSection}>
      <h2>{title}</h2>
      <div className={styles.championCard}>
        <span className={styles.championName}>{champion}</span>
        <Image src="/bishop.png" alt="Champion" width={100} height={100} className={styles.championImg} />
      </div>
      <h3>Top Players</h3>
      <ol className={styles.playerList}>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ol>
    </section>
  );
}
