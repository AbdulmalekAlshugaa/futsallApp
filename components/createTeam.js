import React, { memo, useEffect, useState } from "react";
import PlayerLayout from "./layout/Players";
import axios from "axios";
import Router from "next/router";
import { Grid, Box, Text, Button } from "@chakra-ui/core";
import cogoToast from "cogo-toast";

const CreateTeam = memo(() => {
  const [players, setPlayers] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  useEffect(() => {
    (async () => {
      if (!Router.router.query.bookingId) {
        Router.router.replace("/dashboard");
      } else {
        console.log("hhh");
        const ress = await axios.get("/api/user/players?role=PLAYER");
        // console.log("matches", ress.data)
        setPlayers(ress.data.Users);
      }
    })();
  }, []);

  const handleCreateTeam = async () => {
    try {
      if (myTeam.length === 0) {
        return cogoToast.error("Please select player");
      }
      const loader = cogoToast.loading("Creating Team", { hideAfter: 0 });
      const res = await axios.post("/api/user/createTeam", {
        listOfPlayers: myTeam,
        bookingId: Router.router.query.bookingId,
      });
      loader.hide();
      cogoToast.success("Success");
      Router.router.replace("/teams");
    } catch (error) {
      console.log(error);
    }
  };

  console.log("players", players);
  return (
    <div>
      <PlayerLayout />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Teams
          </h1>
        </div>
      </header>

      <div
        className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8  h-screen pt-4"
        style={{ backgroundColor: "#e5e5e5" }}
      >
        <div>
          <div>Number Of players Selected: {myTeam.length}</div>
          <div>
            <Button variantColor="blue" onClick={handleCreateTeam}>
              Create Team
            </Button>
          </div>
        </div>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {players.map((p) => (
            <Box key={p.email} rounded="md" p={4} w="100%" bg="#fff">
              <Box>
                <Text as="span" fontWeight="bold">
                  Name:{" "}
                </Text>
                <Text as="span">{p.name}</Text>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">
                  Position:{" "}
                </Text>
                <Text as="span">{p.position ? p.position : "ANY"}</Text>
              </Box>
              <Box>
                {myTeam.includes(p.email) ? (
                  <Button
                    onClick={() =>
                      setMyTeam(myTeam.filter((pp) => pp !== p.email))
                    }
                    variantColor="red"
                  >
                    Remove
                  </Button>
                ) : (
                  <Button onClick={() => setMyTeam([...myTeam, p.email])}>
                    Request
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Grid>
      </div>
    </div>
  );
});

export default CreateTeam;
