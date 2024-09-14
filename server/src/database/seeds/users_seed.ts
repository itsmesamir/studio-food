import { Knex } from "knex";
exports.seed = function (knex: Knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        // Script Department
        {
          id: 1,
          name: "Khagendra Lamichhane",
          designation: "Writer",
          department: "Script",
        },
        {
          id: 2,
          name: "Yangesh Raj Pandit",
          designation: "Writer",
          department: "Script",
        },

        // Direction Unit
        {
          id: 3,
          name: "Lokesh Bajracharya",
          designation: "Director",
          department: "Direction Unit",
        },
        {
          id: 4,
          name: "Anil Khadka",
          designation: "1st Asst. Director / Chief AD",
          department: "Direction Unit",
        },
        {
          id: 5,
          name: "Sourab Oli",
          designation: "2nd Asst. Director",
          department: "Direction Unit",
        },
        {
          id: 6,
          name: "Jeevan Dhungel",
          designation: "3rd Asst. Director",
          department: "Direction Unit",
        },
        {
          id: 7,
          name: "Suraj Yadav",
          designation: "4th Asst. Director/Crowd Controller",
          department: "Direction Unit",
        },
        {
          id: 8,
          name: "Anita Syangbo",
          designation: "5th Asst. Director",
          department: "Direction Unit",
        },
        {
          id: 9,
          name: "Smriti Adhikari",
          designation: "5th Asst. Director",
          department: "Direction Unit",
        },
        {
          id: 10,
          name: "Subina Acharya",
          designation: "5th Asst. Director",
          department: "Direction Unit",
        },
        {
          id: 11,
          name: "Sanjog Rasaili",
          designation: "Casting Director",
          department: "Direction Unit",
        },
        {
          id: 12,
          name: "Acting coach",
          designation: "Acting coach",
          department: "Direction Unit",
        },

        // Production Unit
        {
          id: 13,
          name: "Sulav Budhathoki",
          designation: "Executive Producer",
          department: "Production Unit",
        },
        {
          id: 14,
          name: "Medha Bhattarai",
          designation: "Executive Producer",
          department: "Production Unit",
        },
        {
          id: 15,
          name: "Khagendra Lamichhane",
          designation: "Producer 2",
          department: "Production Unit",
        },
        {
          id: 16,
          name: "Santosh Giri",
          designation: "Co-Producer 1",
          department: "Production Unit",
        },
        {
          id: 17,
          name: "Sagar Kharel",
          designation: "Co-Producer 2",
          department: "Production Unit",
        },
        {
          id: 18,
          name: "Anjani Gajurel",
          designation: "Production Designer",
          department: "Production Unit",
        },
        {
          id: 19,
          name: "Aashika Sharma",
          designation: "Senior Art Director",
          department: "Production Unit",
        },
        {
          id: 20,
          name: "Phanendra Bohara",
          designation: "Art Director",
          department: "Production Unit",
        },
        {
          id: 21,
          name: "Sajan Bastakoti",
          designation: "Asst. 2",
          department: "Production Unit",
        },
        {
          id: 22,
          name: "Prajwal Lamichhane",
          designation: "Asst. 3",
          department: "Production Unit",
        },
        {
          id: 23,
          name: "Arun Regmi",
          designation: "Production Manager",
          department: "Production Unit",
        },
        {
          id: 24,
          name: "Arjun Pokhrel",
          designation: "Asst. 1",
          department: "Production Unit",
        },
        {
          id: 25,
          name: "Krishna Tamang",
          designation: "Asst. 2",
          department: "Production Unit",
        },
        {
          id: 26,
          name: "Mukesh Kumar Karna",
          designation: "Local Manager",
          department: "Production Unit",
        },
        {
          id: 27,
          name: "Alex Basukala",
          designation: "Costume Designer",
          department: "Production Unit",
        },
        {
          id: 28,
          name: "Costume Man 1",
          designation: "Costume Man 1",
          department: "Production Unit",
        },
        {
          id: 29,
          name: "Costume Man 2",
          designation: "Costume Man 2",
          department: "Production Unit",
        },
        {
          id: 30,
          name: "Samsher Tamang",
          designation: "Make Up Artist (Package)",
          department: "Production Unit",
        },
        {
          id: 31,
          name: "Asst. 1",
          designation: "Asst. 1",
          department: "Production Unit",
        },
        {
          id: 32,
          name: "Manju Kumari Thagunna",
          designation: "Hair Designer",
          department: "Production Unit",
        },
        {
          id: 33,
          name: "Asst. 1",
          designation: "Asst. 1",
          department: "Production Unit",
        },
        {
          id: 34,
          name: "Spot Boy 1",
          designation: "Spot Boy 1",
          department: "Production Unit",
        },
        {
          id: 35,
          name: "Spot Boy 2",
          designation: "Spot Boy 2",
          department: "Production Unit",
        },
        {
          id: 36,
          name: "Spot Boy 3",
          designation: "Spot Boy 3",
          department: "Production Unit",
        },
        {
          id: 37,
          name: "Spot Boy 4",
          designation: "Spot Boy 4",
          department: "Production Unit",
        },
        {
          id: 38,
          name: "Anand Baral",
          designation: "Spot 5 (OPT, TBD)",
          department: "Production Unit",
        },

        // Camera Unit
        {
          id: 39,
          name: "Narendra Mainali",
          designation: "Cinematographer",
          department: "Camera Unit",
        },
        {
          id: 40,
          name: "Rabi Roka/Ashish Basnet",
          designation: "Asst. Cinematographer",
          department: "Camera Unit",
        },
        {
          id: 41,
          name: "Ujan Kumar Bharati",
          designation: "Focus Puller",
          department: "Camera Unit",
        },
        {
          id: 42,
          name: "Light Man 1",
          designation: "Light Man 1",
          department: "Camera Unit",
        },
        {
          id: 43,
          name: "Light Man 2",
          designation: "Light Man 2",
          department: "Camera Unit",
        },
        {
          id: 44,
          name: "Light Man 3",
          designation: "Light Man 3",
          department: "Camera Unit",
        },
        {
          id: 45,
          name: "Light Man 4",
          designation: "Light Man 4",
          department: "Camera Unit",
        },
        {
          id: 46,
          name: "Light Man 5",
          designation: "Light Man 5",
          department: "Camera Unit",
        },
        {
          id: 47,
          name: "Rajiv Chhetri 1",
          designation: "Crane Boy 1",
          department: "Camera Unit",
        },
        {
          id: 48,
          name: "Rajiv Chhetri 2",
          designation: "Crane Boy 2",
          department: "Camera Unit",
        },

        // VFX Unit
        {
          id: 49,
          name: "Pukar Dhimal",
          designation: "VFX Supervisor 1",
          department: "VFX Unit",
        },
        {
          id: 50,
          name: "Bikram Gurung",
          designation: "VFX Supervisor 2",
          department: "VFX Unit",
        },

        // Actors and Visitors
        ...Array.from({ length: 30 }, (v, i) => ({
          id: 51 + i,
          name: `Actor ${i + 1}`,
          designation: `Actor ${i + 1}`,
          department: "Actors",
        })),
        ...Array.from({ length: 20 }, (v, i) => ({
          id: 81 + i,
          name: `Visitor ${i + 1}`,
          designation: `Visitor ${i + 1}`,
          department: "Visitors",
        })),
      ]);
    });
};
