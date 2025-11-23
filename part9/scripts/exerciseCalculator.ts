interface Stats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type Rating = 1 | 2 | 3;

const getRating = (ratio: number): Rating => {
  if (ratio >= 1) return 3;
  if (ratio >= 0.33) return 2;
  return 1;
};

export const calculateExercies = (data: number[], target: number): Stats => {
  const avg = data.reduce((a, b) => a + b) / data.length;
  const rating = getRating(avg / target);

  const description = {
    1: "Do better!",
    2: "Not bad kid!",
    3: "Woo! You won life!",
  } as const;

  return {
    periodLength: data.length,
    trainingDays: data.filter((d) => d !== 0).length,
    success: avg >= target,
    rating: rating,
    ratingDescription: description[rating],
    target: target,
    average: avg,
  };
};

if (require.main === module) {
  const data = process.argv.slice(3).map((x) => parseFloat(x));
  const training = data.slice(1);
  const target = data[0];

  if (data.length < 2) {
    console.log("Please input appropriate data.");
  } else {
    console.log(calculateExercies(training, target));
  }
}
