import Head from 'next/head'
import dbConnect from "../lib/dbConnect"
import Group from "../models/Group"
import ReleaseCard from "../Components/ReleaseCard"
import Release from "../models/Release"
import { motion } from "framer-motion"

// MAKE ALL LINKS/PATHS UPPERCASE TO MAKE ROUTING WITH LINKS EASIER
// FIX 

export default function Home({groups, releases}) {

  let closestReleases = [];
  let currentDate = new Date();
  let found = false;
  let foundIndex = 0;
  // while (!found) {
  //   let releaseDate = new Date(releases[i].date)
  //   if (releaseDate.getDate() === currentDate.getDate()) {
  //     found = true;
  //   } else {
  //     i++;
  //   }
  // }

  for (let i = 0; i < releases.length; i++) {
    let releaseDate = new Date(releases[i].date)
    if (releaseDate.getDate() >= currentDate.getDate()) {
      found = true
      foundIndex = i
      break
    }
  }

  try {
    while ((closestReleases.length != 3)) {
      closestReleases.push(releases[foundIndex]);
      foundIndex++;
    }
  } catch(err) {

  }

  console.log(foundIndex)

  return (
    <>
      <Head>
        <title>K-Calendar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <motion.h1 className="text-center text-7xl mt-20 font-poppins" 
          initial = {{
            opacity: 0,
            scale: 0.5
          }}
          animate = {{
            opacity: 1,
            scale: 1,
          }}
          transition = {{
            duration: 1.5,
          }}>
          Upcoming Releases
        </motion.h1>
        <div className="px-16 mx-auto mt-20 grid lg:grid-cols-3 md:grid-cols-3 gap-x-10 gap-y-14 sm:grid-cols-1 2xl:px-64">
        {closestReleases.map((release) => (
          <motion.div 
            initial = {{
              y: 500,
              opacity: 0,
              scale: 0.5
            }}
            animate = {{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            transition = {{
              duration: 1.5,
            }}>
            <ReleaseCard artist={release.artist} name={release.name} date={release.date} key={release["_id"]} image={release["artist image"]}></ReleaseCard>
          </motion.div>
        ))}
        </div>
      </main>
    </>
  )
}

// export async function getServerSideProps() {
//   await dbConnect()

//   /* find all the data in our database */
//   const groupData = await Group.find({})
//   const groups = groupData.map((doc) => {
//     const group = doc.toObject()
//     group._id = group._id.toString()
//     return group
//   })

//   const releaseData = await Release.find({})
//   const releases = releaseData.map((doc) => {
//     const release = doc.toObject()
//     release._id = release._id.toString()
//     return release
//   })
//   console.log(releases)

//   return { props: { groups: groups }}
// } 

export async function getStaticProps() {
  await dbConnect()

  /* find all the data in our database */
  const groupData = await Group.find({})
  const groups = groupData.map((doc) => {
    const group = doc.toObject()
    group._id = group._id.toString()
    return group
  })

  const releaseData = await Release.find({})
  const releases = releaseData.map((doc) => {
    const release = doc.toObject()
    release._id = release._id.toString()
    return release
  })

  return { props: { groups: groups, releases: releases }}
} 