import { Button,ButtonIcon, Menu, MenuItem, MenuItemLabel, ThreeDotsIcon } from "@gluestack-ui/themed";
import { useContext } from "react";
import { ContextArea } from "../context/context";

export function MenuHome() {
  const { userData, logout } = useContext(ContextArea)

  return(
    <Menu
      placement="bottom right" mt={5}
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} bgColor="#000" w="$10" borderRadius={"$full"}>
            <ButtonIcon as={ThreeDotsIcon} rotation={90} />
          </Button>
        );
      }}
    >
      <MenuItem key="Name" textValue="Name" disabled>
        <MenuItemLabel size='sm'>
          {userData?.name}
        </MenuItemLabel>
      </MenuItem>
      <MenuItem key="Sair" textValue="Sair" onPress={()=>logout()}>
          <MenuItemLabel size='sm' color="$red400">
            Sair
          </MenuItemLabel>
      </MenuItem>
    </Menu>
  )
}