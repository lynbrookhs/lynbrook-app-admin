import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import WrappedLink from "~/components/WrappedLink";
import MainLayout from "~/layouts/MainLayout";

const Dashboard = () => {
  const { data: user } = useUser();

  const db = useFirestore();
  const userRef = db.collection("users").doc(user.uid);

  const { data: clubs } = useFirestoreCollectionData(
    db.collection("authors").where("admins", "array-contains", userRef),
    { idField: "id" }
  );

  return (
    <List>
      {clubs.map((x) => (
        <ListItem
          key={x.id}
          button
          component={WrappedLink}
          href={`/dashboard/clubs/${x.id}`}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={x.name} secondary="Admin" />
        </ListItem>
      ))}
    </List>
  );
};

Dashboard.layout = MainLayout;

export default Dashboard;
