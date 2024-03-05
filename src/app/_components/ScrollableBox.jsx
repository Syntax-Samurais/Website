export function RunHistory({ pastRuns, user_id }) {
  const sortedPastRuns = pastRuns
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // console.log(user_id)
  const handleDelete = (e) => {
    // alert("Deleting run"); //API Post request to delete run
    console.log(e.target.id);

    const res = fetch("api/Cardio", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        currentDate: sortedPastRuns[e.target.id].date.split("T")[0],
        miles: sortedPastRuns[e.target.id].miles_ran,
        time: sortedPastRuns[e.target.id].run_time,
      }),
    });
  };

  return (
    <ul className="divide-y divide-SecondaryGrey">
      {sortedPastRuns.map((run, index) => (
        <li key={index} className="py-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{run.date.split("T")[0]}</p>
              <p className="text-sm">Time Taken: {run.run_time}</p>
              <p className="text-sm">Miles Ran: {run.miles_ran}</p>
            </div>
            <button
              id={index}
              onClick={(e) => handleDelete(e)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ScrollableBox({ pastRuns, user_id }) {
  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-center text-white text-2xl font-bold mb-4">
        Run History
      </h1>
      <div className="bg-PrimaryBlue w-96 max-h-80 rounded-lg text-white border border-black overflow-auto">
        <div className="p-4">
          {pastRuns && pastRuns.length > 0 ? (
            <RunHistory pastRuns={pastRuns} user_id={user_id} />
          ) : (
            <p className="text-center">No past runs recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
}
