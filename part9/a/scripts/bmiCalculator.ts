export const calculateBmi = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else {
    return "overweight";
  }
};

if (require.main === module) {
  const height = parseInt(process.argv[3], 10);
  const weight = parseInt(process.argv[4], 10);
  console.log(calculateBmi(height, weight));
}
