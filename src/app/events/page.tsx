import { getEvents } from "@/actions/events";
import EventsClient from "./EventsClient";

export const revalidate = 60;

export default async function EventsPage() {
  const res = await getEvents();
  const events = res.success ? res.events : [];

  return <EventsClient initialEvents={events} />;
}
