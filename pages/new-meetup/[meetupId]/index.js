import Head from "next/head";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <div style={{ textAlign: "center" }}>
        <img src={props.meetupData.image} alt="A First Meetup" width="100%" />
        <h1>{props.meetupData.title}</h1>
        <address>{props.meetupData.address}</address>
        <p>{props.meetupData.description}</p>
      </div>
    </>
  );
}

// fallback: false means paths contain all supported meetupId values
// fallback: true means if user enter m3 then next will pre render a page at the runtime
export async function getStaticPaths() {
  const { client, db } = await connectToDatabase();

  const meetupsCollection = db.collection("meetup");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const { client, db } = await connectToDatabase();

  const meetupsCollection = db.collection("meetup");
  const selectMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        id: selectMeetup._id.toString(),
        title: selectMeetup.title,
        image: selectMeetup.image,
        address: selectMeetup.address,
        description: selectMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
