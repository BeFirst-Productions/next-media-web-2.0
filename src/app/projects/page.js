import ProjectListing from "../../components/Projects/ProjectListing";

export const metadata = {
  title: "Next Media | Projects",
  description:
    "Explore Next Media projects showcasing creative branding, design, and digital marketing success stories.",
  keywords: [
    "projects",
    "branding agency in uae",
    "branding agency dubai",
    "branding companies in dubai",
    "top branding agency in dubai",
    "branding in dubai",
    "branding company uae",
    "best creative agencies in dubai",
    "professional marketing agency dubai",
    "social media agency dubai",
    "marketing companies in dubai"
  ],
  alternates: {
    canonical: "https://nextmedia.ae/projects",
  },
};
export default function ProjectsPage() {
  return (
    <>
      <ProjectListing />
    </>
  );
}
