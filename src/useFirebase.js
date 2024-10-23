// src/useFirebase.js

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./utilities/firebase";

const useFirebase = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        setData(val);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
};

export default useFirebase;
