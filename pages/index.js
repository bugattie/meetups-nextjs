import Head from "next/head";
import { connectToDatabase } from "../utils/mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/60/M%C3%BCnchen_Marienplatz_Rathaus_Frauenkirche_Liebfrauendom.jpg",
//     address: "Some address",
//     description: "This is first description",
//   },
//   {
//     id: "m2",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/M%C3%BCnchen_Blick_vom_Neuen_Rathaus_zu_St_Peter_September_2017.jpg/1024px-M%C3%BCnchen_Blick_vom_Neuen_Rathaus_zu_St_Peter_September_2017.jpg",
//     address: "Some other address",
//     description: "This is second description",
//   },
// ];

/*
  Below code is bad for SEO. Because NEXTJS won't wait for the second render cycle to be completed.
function HomePage() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    // Fetch data from an API
    setMeetups(DUMMY_MEETUPS);
  }, [])

  return <MeetupList meetups={DUMMY_MEETUPS} />;
}
*/

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups with NextJs</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from an API
  const { client, db } = await connectToDatabase();

  const meetupsCollection = db.collection("meetup");
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
  };
}

export default HomePage;
