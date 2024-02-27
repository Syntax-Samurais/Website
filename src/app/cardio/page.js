"use client";

import Header from "../_components/_header";
import NavBar from "../_components/_navbar";

export default function Cardio() {
  return (
    <>
      <Header />
      <NavBar />
      <UserGoalMiles />
      <div className="flex justify-center mt-12">
        <div className="mx-24">
          <ScrollableBox />
        </div>
        <div className="mx-24">
          <Box />
        </div>
      </div>
    </>
  );
}

const UserGoalMiles = () => {
  return (
    <div className="flex justify-center items-center pt-12">
      <div className="bg-blue-950 p-8 rounded-lg text-center text-white">
        <p className="text-lg font-bold">I want to run 10 Miles every day!</p>
      </div>
    </div>
  );
};

const ScrollableBox = () => {
  //Sorts past runs by date, most recent first
  const sortedPastRuns = pastRuns
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <h1 className="text-center text-white text-xl">History</h1>
      <div className="bg-blue-950 w-96 h-96 rounded-lg text-center text-white border border-black overflow-auto">
        <div className="p-4">
          <ul className="list-disc list-inside">
            {/* Maps through past runs and displays them */}
            {sortedPastRuns.map((run, index) => (
              <li key={index} className="mb-2">
                <strong>{run.date}</strong> | Time Taken: {run.run_time} | Miles
                Ran: {run.miles_ran}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

//function `Box` is a placeholder for the new entry form
const Box = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = e.target.elements.date.value;
    const runHours = e.target.elements.run_hours.value || 0;
    const runMinutes = e.target.elements.run_minutes.value || 0;
    const runSeconds = e.target.elements.run_seconds.value || 0;

    // Calculate the total run time in seconds
    const totalSeconds =
      parseInt(runHours) * 3600 +
      parseInt(runMinutes) * 60 +
      parseInt(runSeconds);

    // Convert the total seconds to hours, minutes, and seconds format
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const run_time = `${hours}:${minutes}:${seconds}`;
    const miles_ran = e.target.elements.miles_ran.value;

    const entry = { date, run_time, miles_ran };
    console.log(entry);
  };

  return (
    <>
      <h1 className="text-center text-white text-xl">New Entry</h1>
      <div className="bg-blue-950 w-96 h-96 rounded-lg text-center text-white border border-black">
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="date" className="block text-left text-white">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-white">Run Time</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="run_hours"
                  name="run_hours"
                  placeholder="Hours"
                  className="w-full rounded-md p-2 text-black"
                />
                <input
                  type="number"
                  id="run_minutes"
                  name="run_minutes"
                  placeholder="Minutes"
                  className="w-full rounded-md p-2 text-black"
                />
                <input
                  type="number"
                  id="run_seconds"
                  name="run_seconds"
                  placeholder="Seconds"
                  className="w-full rounded-md p-2 text-black"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="miles_ran" className="block text-left text-white">
                Miles Ran
              </label>
              <input
                type="text"
                id="miles_ran"
                name="miles_ran"
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-800 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

//Until database is up, refrence this
const pastRuns = [
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
  { date: "2024-02-20", run_time: "3:02:36", miles_ran: "5" },
];
