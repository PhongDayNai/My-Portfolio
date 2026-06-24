// Helper to calculate years of experience from experienceStartDate
export const getExperience = (startDateStr: string) => {
  const startDate = new Date(startDateStr);
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const diffMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
  const x = Math.floor(diffMonths / 12);
  const m = diffMonths % 12;

  return { x, m };
};

export const getExperienceText = (startDateStr: string, lang: "vi" | "en") => {
  const { x, m } = getExperience(startDateStr);
  if (lang === "vi") {
    if (m < 4) {
      return `hơn ${x} năm kinh nghiệm thực chiến`;
    } else if (m < 8) {
      return `${x} năm rưỡi kinh nghiệm thực chiến`;
    } else if (m < 11) {
      return `gần ${x + 1} năm kinh nghiệm thực chiến`;
    } else {
      return `${x + 1} năm kinh nghiệm thực chiến`;
    }
  } else {
    const yearsStr = (num: number) => (num === 1 ? "year" : "years");
    if (m < 4) {
      return `over ${x} ${yearsStr(x)} of hands-on experience`;
    } else if (m < 8) {
      return `${x} and a half ${yearsStr(x)} of hands-on experience`;
    } else if (m < 11) {
      return `nearly ${x + 1} ${yearsStr(x + 1)} of hands-on experience`;
    } else {
      return `${x + 1} ${yearsStr(x + 1)} of hands-on experience`;
    }
  }
};
