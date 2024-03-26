import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

const Home = () => {
  const { user, isLoading, signOutUser } = useContext(AuthContext);
  const [isCardNext, setIsCardNext] = useState();

  const socket = io("http://localhost:3000");

  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOutUser();
    navigate("/");
  };

  const socketId = user?.email?.split("@")[0] ?? "";

  socket.on("connect", () => {
    socket.on(socketId, (arg) => {
      setIsCardNext(arg);
    });
  });

  useEffect(() => {
    if (!isLoading && user == null) return navigate("/");

    return () => {
      socket.disconnect();
    };
  }, [user, isLoading]);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex flex-col gap-5 items-center justify-center">
        <Skeleton className="w-[90%] h-[200px]" />
        <Skeleton className="w-[90%] h-[200px]" />
      </div>
    );

  return (
    <div className="w-screen h-screen flex flex-col gap-1 items-center justify-center">
      <h1>
        <span className="font-bold">Email:</span> {user?.email}
      </h1>
      <h1>
        <span className="font-bold">Uid: </span> {user?.uid}
      </h1>
      <Button onClick={handleLogOut} variant={"destructive"}>
        LogOut
      </Button>
      <DialogCard setIsCardNext={setIsCardNext} open={!!isCardNext} infos={isCardNext} />
    </div>
  );
};

interface IDialogCard {
  open: boolean;
  infos: any;
  setIsCardNext: (value: any) => void;
}

const DialogCard = ({ infos, open, setIsCardNext }: IDialogCard) => {
  const handleClose = () => {
    setIsCardNext(null);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <span>CARTÃO: {infos}</span>
        <Button onClick={handleClose} variant={"destructive"}>
          Fechar
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Home;
