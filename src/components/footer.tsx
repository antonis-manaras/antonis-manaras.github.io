export function AppFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} Astrotype. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
