import { useUser } from "reactfire";
import MainLayout from "~/layouts/MainLayout";

const Club = () => {
  const { data: user } = useUser();

  return null;
};

Club.layout = MainLayout;

export default Club;
