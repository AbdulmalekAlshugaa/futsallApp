const routs = require("express").Router();
const crypto = require("crypto");
const createUser = require("../functions/createUser");
const findUserByEmail = require("../functions/findUser");
const createTeam = require("../functions/createTeam");
const getUsers = require("../functions/getUsers");
const getLocation = require("../functions/getLocation");
const createCenter = require("../functions/createCenter");
const getMyCenters = require("../functions/getMyCenters");
const filemiddelware = require("../middleware/files");
const uploadFile = require("../functions/uploadFirebase");
const getCenterbyid = require("../functions/getCenter");
const createCourt = require("../functions/createCourt");
const getCourtCenter = require("../functions/getCourtCenter");
const getPlayersPostion = require("../functions/findAllPlayers");
const getMyCourtBooking = require("../functions/getMyCourtBooking");
const getBookingByCenterId = require("../functions/getBookingByCenterId");
const getBookingByCourtId = require("../functions/getBookingByCourtId");
const removeBookingById = require("../functions/removeBookingById");
const handleCenter = require("../functions/handleCenter");
const getAllCenters = require("../functions/getAllCenters");
const getCourts = require("../functions/getCourts");
const handleTeamRequest = require("../functions/handleTeamRequest");
const getBookingById = require("../functions/getBookingByIds");
const getTeamById = require("../functions/getTeamById");
const updateUser = require("../functions/updateUser");
// const updatePhoto = require('')

const updateCenter = require("../functions/updateCenter");
const findNearCenter = require("../functions/findNearCenter");
const distance = require("../functions/calculateDistance");
const bookingCourt = require("../functions/bookACour");
const moment = require("moment");
// const updatePhoto = require('')
const getMyTeam = require("../functions/getMyTeam");
const createCompetition = require("../functions/createCompe");
const subscripToComp = require("../functions/subscripToCompetition");
const joinTeam = require("../functions/joinTeam");
const getuserbyemail = require("../functions/getMultipleUsers");
const getCompetitionsBasedOnStauts = require("../functions/getCompetition");
const updateCom = require("../functions/updateCompetision");
// const updatePhoto = require('')

routs.post("/update_user", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      position,
      natoinality,
      passpoerNumber,
      birthday,
      age,
    } = req.body;

    let hashedPassword;
    if (password) {
      hashedPassword = crypto
        .createHmac("sha256", process.env.hashingSecret) // encrypted password
        .update(password)
        .digest("hex"); // passing the password
    }
    await updateUser(req.cookies.email, {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password: hashedPassword }),
      ...(phone && { phone }),
      ...(role && { role }),
      ...(position && { position }),
      ...(natoinality && { natoinality }),
      ...(passpoerNumber && { passpoerNumber }),
      ...(birthday && { birthday }),
      ...(age && { age }),
    });

    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
routs.post("/createUser", async (req, res) => {
  // send json
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      position,
      natoinality,
      passpoerNumber,
      birthday,
      age,
    } = req.body;

    const ePassword = crypto
      .createHmac("sha256", process.env.hashingSecret) // encrypted password
      .update(password)
      .digest("hex"); // passing the password

    await createUser({
      name,
      password: ePassword,
      email,
      phone,
      role,
      position,
      natoinality,
      passpoerNumber,
      birthday,
      age,
    });

    res.cookie("email", email, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 8640000000),
    });
    res.json({
      message: "SUCCESS User Has Created Successfully",
    });
    //
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.get("/Playerpostion", async (req, res) => {
  try {
    const { position } = req.query;
    console.log("postion", position);
    const players = await getPlayersPostion(position);

    if (!players) {
      console.log("Something went wrong ");
      res.status(500).end();
    } else {
      // if user role is there get the last of the user name
      console.log("Success" + players);
      res.json({
        players: players,
      });
    }
  } catch (error) {
    console.log("Error");
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.post("/login", async (req, res) => {
  try {
    console.log("hi before sending request");
    const { email, password } = req.body;

    const ePassword = crypto
      .createHmac("sha256", process.env.hashingSecret) // encrypt password
      .update(password)
      .digest("hex"); // passing the password

    const user = await findUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    } else if (user.password !== ePassword) {
      throw new Error("Passowrd is wrong");
    }

    res.cookie("email", user.email, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 8640000000),
    });
    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
// create team
routs.post("/createTeam", async (req, res) => {
  try {
    const email = req.cookies.email;
    const { listOfPlayers, bookingId } = req.body;

    await createTeam({
      captainEmail: email,
      status: "s",
      bookingId,
      listOfPlayers: listOfPlayers.map((p) => ({
        Email: p,
        status: "Pending",
      })),
    });

    res.json({
      message: "SUCCESS Team Has Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
// get CurrentUsers
routs.get("/CurrentUser", async (req, res) => {
  const { email } = req.cookies;

  try {
    const curUser = await findUserByEmail(email);

    if (!curUser) {
      console.log("something wrong");
      res.status(401).end();
    } else {
      res.json({
        user: curUser,
      });
    }

    // get the currentUser from the cookies
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    console.log(e);
  }
});
// logout
routs.get("/logout", async (req, res) => {
  console.log("hi from logout function");

  // get cookies
  const cookie = req.cookies;
  console.log("cookies", cookie);

  try {
    // clear the email address  and responds with message
    res.clearCookie("email", cookie);

    res.redirect("/");

    // get the currentUser from the cookies
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    console.log(e);
  }
});
// logout
// get playrs based on the postion
// get Players
routs.get("/players", async (req, res) => {
  try {
    const name = await getUsers("PLAYER");
    const users = name.filter((u) => u.email !== req.cookies.email);
    res.json({
      Users: users,
    });
  } catch (error) {
    console.log("Error");
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
// send team request

routs.get("/getMyCenters", async (req, res) => {
  try {
    const centers = await getMyCenters(req.cookies.email);
    res.json({ centers });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.get("/getMyTeam", async (req, res) => {
  const { email } = req.cookies;

  try {
    const team = await getMyTeam(email);

    if (!team) {
      res.status(401).end();
    } else {
      res.json({
        team: team,
      });
    }

    // get the currentUser from the cookies
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    console.log(e);
  }
});

routs.post("/createCenter", async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    // get the location
    const locations = await getLocation(address);
    console.log(locations);
    if (locations.length === 0) {
      throw new Error("No location found");
    }

    await createCenter({
      name,
      address,
      phoneNumber: phone,
      ownerEmail: req.cookies.email,
      location: {
        type: "Point",
        coordinates: [locations[0].longitude, locations[0].latitude],
      },
    });
    res.json({ message: "SUCCESS" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.post("/cancelBooking", async (req, res) => {
  try {
    await removeBookingById(req.body.bookingId);
    res.json({ message: "SUCCESS" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.post("/handleCenter", async (req, res) => {
  try {
    await handleCenter(req.body.centerId, req.body.type);
    res.json({ message: "SUCCESS" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
routs.post("/sendInvition", async (req, res) => {
  const { email } = req.cookies; // get the email address
  console.log("Testing function");
  console.log(email);
  const { captainEmail, PlayerEmail, status } = req.body;

  try {
    await joinTeam({ captainEmail: email, PlayerEmail, status });
    res.json({
      message: "Inivation has send",
    });
  } catch (error) {}
});

routs.post("/handleTeamRequest", async (req, res) => {
  try {
    const { id, status } = req.body;
    await handleTeamRequest(id, req.cookies.email, status);
    res.json({
      message: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
// create court
routs.post("/createCourt", async (req, res) => {
  console.log("test");
  try {
    const { name, centerId, capacity, price } = req.body;

    await createCourt({ name, centerId, capacity, price });

    res.json({
      message: "SUCCESS court Has Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
routs.post("/nearCenters", async (req, res) => {
  try {
    const address = req.body.address;
    const max = req.body.max;
    const locations = await getLocation(address);
    if (locations.length === 0) {
      throw new Error("No location found");
    }

    const centers = await findNearCenter({
      longitude: locations[0].longitude,
      latitude: locations[0].latitude,
      max,
    });
    const centerWithdis = centers.map((c) => {
      const distanceKM = distance(
        c.location.coordinates[1],
        c.location.coordinates[0],
        locations[0].latitude,
        locations[0].longitude
      );
      return { ...c, distanceKM };
    });
    res.json({
      centerWithdis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
routs.post(
  "/centerPhotoes",
  filemiddelware.single("file"),
  async (req, res) => {
    console.log("Test");
    try {
      const file = req.file;
      // save file to upload file function

      const uri = await uploadFile(file);
      console.log("Url is ", uri);
      console.log(uri);
      if (!uri) {
        res.status(5000);
      }
      res.json({ uri: uri });

      //
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }

    // get center
  }
);
routs.post("/editCenter", async (req, res) => {
  try {
    const { id, address, start, end } = req.body;
    const center = await getCenterbyid(id);
    let location;
    if (center.address !== address) {
      const locations = await getLocation(address);
      if (locations.length === 0) {
        throw new Error("No location found");
      }
      location = {
        type: "Point",
        coordinates: [locations[0].longitude, locations[0].latitude],
      };
    } else {
      location = center.location;
    }

    await updateCenter(id, {
      location,
      address,
      workingHours: {
        from: start,
        to: end,
      },
    });

    res.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.post("/bookCourt", async (req, res) => {
  try {
    const { centerId, courtId, from, to, date } = req.body;

    const bookingFrom = parseInt(from);
    const bookingTo = parseInt(to);
    // check within the working hours
    const center = await getCenterbyid(centerId);
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }
    if (!center.workingHours.from && !center.workingHours.to) {
      if (center.workingHours.from !== "0" && center.workingHours.to !== "0") {
        const fromInt = parseInt(center.workingHours.from);
        const toInt = parseInt(center.workingHours.to);

        if (bookingFrom > bookingTo) {
          throw new Error("The times are wrong");
        } else if (bookingFrom < fromInt) {
          throw new Error("Please check operation hour");
        } else if (toInt < bookingTo) {
          throw new Error("Please check operation hour");
        }
      }
    }

    // validate
    const booking = await getBookingByCourtId(courtId);
    booking.map((b) => {
      if (moment(b.date).isSame(moment(date, "YYYY-MM-DD"), "day")) {
        if (
          from === b.from ||
          to === b.to ||
          (Number(from) > Number(b.from) && Number(from) < Number(b.to)) ||
          (Number(to) > Number(b.from) && Number(to) < Number(b.to))
        ) {
          throw new Error("Court is reserved");
        }
      }
    });
    await bookingCourt({
      from,
      to,
      date: moment(date, "YYYY-MM-DD").toISOString(),
      userId: req.cookies.email,
      centerId,
      courtId,
    });
    res.json({ message: "SUCCESS" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.get("/getMyBook", async (req, res) => {
  try {
    const booking = await getMyCourtBooking(req.cookies.email);
    res.json({
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.get("/getCenterBooking", async (req, res) => {
  try {
    const booking = await getBookingByCenterId(req.query.centerId);

    res.json({
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
routs.get("/getMyCenterBooking", async (req, res) => {
  try {
    const centers = await getMyCenters(req.cookies.email);
    const centersId = centers.map((c) => c.id);
    const booking = await getBookingByCenterId(centersId);

    res.json({
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
// get center by id
routs.get("/getCenter", async (req, res) => {
  try {
    const { id } = req.query;
    const centers = await getCenterbyid(id);
    const courts = await getCourtCenter(id);
    res.json({ centers, courts });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.get("/allCenters", async (req, res) => {
  try {
    const centers = await getAllCenters();
    res.json({
      centers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.get("/getCourts", async (req, res) => {
  // pass the centired id
  try {
    const { centerId } = req.query;

    const coutrs = await getCourts(centerId);
    res.json({ coutrs });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

routs.post("/createCompetition", async (req, res) => {
  try {
    // get centired id
    const {
      name,
      from,
      to,
      time,
      decription,
      prize,
      orgnizerName,
      phoneNUmner,
      centerName,
      location,
      firstPlacePrize,
      secondPlacePrize,
      thirdPlacePrize,
      bestplayeraward,
      bestKBaward,
      soceraward,
      costCompetition,
      passportNumber,
    } = req.body;

    await createCompetition({
      centerId: req.cookies.email,
      name,
      from,
      to,
      time,
      decription,
      prize,
      orgnizerName,
      phoneNUmner,
      centerName,
      location,
      firstPlacePrize,
      secondPlacePrize,
      thirdPlacePrize,
      bestplayeraward,
      bestKBaward,
      soceraward,
      costCompetition,
      CompetitionStauts: "PENDING",
      passportNumber,
    });

    res.json({
      createCompetition: "Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
routs.post("/subscripToComp", async (req, res) => {
  try {
    const email = req.cookies.email;
    const {
      id,
      competitionId,
      captainEmail,
      name,
      listofmyPlayers,
      decription,
    } = req.body;

    await subscripToComp({
      id,
      competitionId,
      captainEmail: email,
      name,
      listofmyPlayers,
      decription,
    });

    res.json({
      subscrip: "Team has added to the list",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
// get center by email
// get booking by center id
// get user by emaill with one route
routs.get("/getAllCenterBooking", async (req, res) => {
  try {
    const bookingCenter = await getMyCenters(req.cookies.email);

    console.log("bookingCenter", bookingCenter);

    const emails = [];
    const booking = await Promise.all(
      bookingCenter.map(async (b) => {
        const centerBooking = await getBookingByCenterId(b.id);
        centerBooking.map((e) => {
          emails.push(e.userId);
        });
        return { ...b, booking: centerBooking };
      })
    );
    const user = await getuserbyemail(emails);

    res.json({ booking, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.get("/myMatches", async (req, res) => {
  try {
    const teams = await getMyTeam(req.cookies.email);

    const booking = await getMyCourtBooking(req.cookies.email);

    const matches = await getBookingById(teams.map((t) => t.bookingId));

    res.json({
      booking,
      teams,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.get("/getTeamById", async (req, res) => {
  try {
    const { id } = req.query;
    const team = await getTeamById(id);

    const players = team.listOfPlayers;

    const booking = await getBookingById(team.bookingId);
    const pp = await Promise.all(
      players.map(async (p) => {
        const player = await findUserByEmail(p.Email);
        return { ...player, status: p.status };
      })
    );
    res.json({ players: pp, booking });
  } catch (error) {
    console.log(error);
  }
});
routs.get("/getcompetitions", async (req, res) => {
  try {
    const { Competionsstauts } = "PENDING";

    const competitions = await getCompetitionsBasedOnStauts(Competionsstauts);
    res.json({ competitions });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//
routs.post("/editCenter", async (req, res) => {
  try {
    const { id, address, start, end } = req.body;
    const center = await getCenterbyid(id);
    let location;
    if (center.address !== address) {
      const locations = await getLocation(address);
      if (locations.length === 0) {
        throw new Error("No location found");
      }
      location = {
        type: "Point",
        coordinates: [locations[0].longitude, locations[0].latitude],
      };
    } else {
      location = center.location;
    }

    await updateCenter(id, {
      location,
      address,
      workingHours: {
        from: start,
        to: end,
      },
    });

    res.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

routs.post("/updateStauts", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.send();
    }

    const competitions = await updateCom(id);

    res.json({ competitions });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = routs;
