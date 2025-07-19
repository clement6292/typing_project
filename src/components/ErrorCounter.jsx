import React from "react";

function ErrorCounter({ input, sampleText }) {
  let errors = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== sampleText[i]) errors++;
  }
  return (
    <div className="text-red-600 font-semibold mb-2">
      Erreurs : {errors}
    </div>
  );
}

export default ErrorCounter;