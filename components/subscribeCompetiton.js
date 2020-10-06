import React, { memo, useEffect, useContext, useState } from "react";
import PlayerLayout from "./layout/Super";
import axios from "axios";
import globalState from "./context";
import Router from "next/router";
import { Grid, Box, Text, Button, Stack } from "@chakra-ui/core";
import cogoToast from "cogo-toast";

const CreateTeam = memo(() => {
  const [players, setPlayers] = useState([]);
  // const [myTeam, setMyTeam] = useState([]);
  const { query } = useContext(globalState);
  useEffect(() => {
    (async () => {
      if (query) {
        const ress = await axios.get(
          "/api/user/getcompetitions?Status=PENDING"
        );
        console.log("competions", ress.data);
        setPlayers(ress.data.competitions);

        console.log("players", players);
      }
    })();
  }, [query]);

  const handleCreateTeam = async (id) => {
    const loader = cogoToast.loading("Approveed", { hideAfter: 0 });
    try {
      console.log("id is ", id);

      console.log("id from ", query.id);
      await axios.post(`/api/user/updateStauts?id=${id}`);

      loader.hide();
      cogoToast.success("Success");
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = async (id) => {
    const loader = cogoToast.loading("Approveed", { hideAfter: 0 });
    try {
      console.log("id is ", id);

      loader.hide();
      cogoToast.success("Success");
    } catch (error) {
      console.log(error);
    }
  };

  console.log("players 2 ", players);
  return (
    <div>
      <PlayerLayout />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Subsribe
          </h1>
        </div>
      </header>

      <div
        className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8  min-h-screen pt-4"
        style={{ backgroundColor: "#e5e5e5" }}
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {players.map((p) => (
            <Box key={p.email} rounded="md" p={4} w="100%" bg="#fff">
              <Box>
                <Text as="span" fontWeight="bold">
                  Competion Name:{" "}
                </Text>
                <Text as="span">{p.name}</Text>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">
                  From :{""}
                </Text>
                <Text as="span">{p.from}</Text>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">
                  To :{""}
                </Text>
                <Text as="span">{p.to}</Text>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">
                  Orgnizer name:{""}
                </Text>
                <Text as="span">{p.orgnizerName}</Text>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">
                  Competion Cost:{""}
                </Text>
                <Text as="span">{p.costCompetition}</Text>
              </Box>
              <Box>
                {/* {myTeam.includes(p.email) ? (
                  <Button
                    onClick={() =>
                    //  setMyTeam(myTeam.filter((pp) => pp !== p.email))
                    }
                    variantColor="red"
                  >
                    Remove
                  </Button>
                ) : (
                  <Button onClick={() => setMyTeam([...myTeam, p.email])}>
                    Request
                  </Button>
                )} */}
              </Box>
              <div>
                <Stack isInline mr={4}>
                  <Button
                    variantColor="teal"
                    size="xs"
                    onClick={() => handleCreateTeam(p.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variantColor="red"
                    size="xs"
                    onClick={() => cancel(p.id)}
                  >
                    Reject
                  </Button>
                </Stack>
              </div>
            </Box>
          ))}
        </Grid>
      </div>
    </div>
  );
});

export default CreateTeam;
