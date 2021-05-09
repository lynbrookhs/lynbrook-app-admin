import { useUser } from "reactfire";
import MainLayout from "~/layouts/MainLayout";
import { List, ListItem, ListItemText, AppBar, Tabs, Tab, TabPanel } from "@material-ui/core";
import { useRouter } from "next/router";
import { useFirestoreCollectionData, useFirestore } from "reactfire";
import WrappedLink from "~/components/WrappedLink";

const Club = () => {
  const { data: user } = useUser();
  const router = useRouter();
  console.log(router)
  const { id } = router.query

  const db = useFirestore();
  const authorRef = db.collection("authors").doc(id);

  const { data: announcements } = useFirestoreCollectionData(
    db.collection("announcements").where("from", "==", authorRef),
    { idField: "id" }
  );

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Announcements" />
          <Tab label="Users" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Announcements
      </TabPanel>
      <TabPanel value={value} index={1}>
        Users
      </TabPanel>
      <TabPanel value={value} index={2}>
        Settings
      </TabPanel>
    </>
    // <List>
    //   {announcements.map((x) => (
    //     <ListItem
    //       key={x.id}
    //       button
    //       component={WrappedLink}
    //       href={`/announcements/${x.id}`}
    //     >
    //       <ListItemText primary={x.title} secondary={x.content}/>
    //     </ListItem>
    //   ))}
    // </List>
  );
};

Club.layout = MainLayout;

export default Club;
