import { useEffect } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase/firebase";


export const PRESENCE_ONLINE_MS = 60 * 1000;
export const PRESENCE_AWAY_MS = 5 * 60 * 1000; 

export default function usePresence(uid, name, photo, email) {
  useEffect(() => {
    if (!uid) return;

    const ref = doc(db, "presence", uid);
    const beat = () =>
      setDoc(
        ref,
        { name, photo, email, lastActive: serverTimestamp() },
        { merge: true }
      ).catch(() => {});

    beat();
    const interval = setInterval(beat, 30000);

    const onVisible = () => {
      if (document.visibilityState === "visible") beat();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", beat);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", beat);
    };
  }, [uid, name, photo, email]);
}