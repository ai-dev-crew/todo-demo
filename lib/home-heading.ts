export function homeHeading(projectName: string): string {
  const normalizedName = projectName.trim().replace(/\s+/g, " ");
  return `Welcome to ${normalizedName}`;
}
