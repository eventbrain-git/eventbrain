import React from "react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center px-4 m-10">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">EventBrain</h1>
      <p className="text-lg max-w-xl text-center mb-8 drop-shadow-md">
        Gérez vos événements simplement et efficacement avec EventBrain. 
        Planification, invitations, suivi — tout est là.
      </p>
    </main>
  );
}
