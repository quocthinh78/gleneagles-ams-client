import { makeStyles, useMediaQuery } from "@material-ui/core";
import { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import MenuContainer from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import AboutDialog from "../../AboutDialog";
import ConnectionOptionsDialog from "../../ConnectionOptionsDialog";
import DeviceSelectionDialog from "../../DeviceSelectionDialog";

const useStyles = makeStyles({
  settingsButton: {
    margin: "1.8em 0 0",
  },
});

export default function SettingsMenu({ mobileButtonClass }) {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);
  const [connectionSettingsOpen, setConnectionSettingsOpen] = useState(false);

  const anchorRef = useRef(null);

  return (
    <>
      {isMobile ? (
        <Button
          ref={anchorRef}
          onClick={() => setMenuOpen(true)}
          startIcon={<MoreIcon />}
          className={mobileButtonClass}
        >
          More
        </Button>
      ) : (
        <Button
          ref={anchorRef}
          onClick={() => setMenuOpen(true)}
          startIcon={<SettingsIcon />}
          className={classes.settingsButton}
        >
          Settings
        </Button>
      )}
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen((isOpen) => !isOpen)}
        anchorEl={anchorRef.current}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: isMobile ? "left" : "right",
        }}
        transformOrigin={{
          vertical: 0,
          horizontal: "center",
        }}
      >
        <MenuItem onClick={() => setAboutOpen(true)}>
          <Typography variant="body1">About</Typography>
        </MenuItem>
        <MenuItem onClick={() => setDeviceSettingsOpen(true)}>
          <Typography variant="body1">Audio and Video Settings</Typography>
        </MenuItem>
      </MenuContainer>
      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
          setMenuOpen(false);
        }}
      />
      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
      <ConnectionOptionsDialog
        open={connectionSettingsOpen}
        onClose={() => {
          setConnectionSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
    </>
  );
}
