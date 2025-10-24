import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <Video className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <h2 className="text-3xl font-bold">Страница не найдена</h2>
        <p className="text-xl text-muted-foreground max-w-md">
          К сожалению, запрашиваемая страница не существует
        </p>
        
        <div className="pt-6">
          <a href="/">
            <Button variant="hero" size="lg">
              <Home className="w-5 h-5" />
              Вернуться на главную
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
