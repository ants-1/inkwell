import { Box, VStack, Menu, Portal } from "@chakra-ui/react";
import { Bell, NotepadText, UsersRound, Wrench, UserRound } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { href: "/notes", icon: NotepadText },
  { href: "/teams", icon: UsersRound },
  { href: "/notifications", icon: Bell },
  { href: "/settings", icon: Wrench },
];

export default function Sidebar() {
  const isAuth = false;

  return (
    <Box
      w={{ base: "16", md: "20" }}
      minH="dvh"
      position="fixed"
      top="0"
      left="0"
      backgroundColor="gray.700"
      pt="5"
    >
      <VStack display="flex" alignItems="center" gap="2" height="full" >
        {sidebarItems.map(({ href, icon: Icon }, i) => (
          <Link key={i} href={href}>
            <Box boxSize={{ base: 10, md: 11 }} p="2" _hover={{ backgroundColor: "gray.900" }} rounded="xl">
              <Icon color="white" height="full" width="full" />
            </Box>
          </Link>
        ))}
        <Menu.Root>
          <Menu.Trigger asChild>
            <Box boxSize={{ base: 10, md: 11 }} p="2" _hover={{ backgroundColor: "gray.900" }} rounded="xl">
              <UserRound color="white" height="full" width="full" cursor="pointer" />
            </Box>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content backgroundColor="gray.900">
                {isAuth ? (
                  <Box>
                    <Link href="/profile">
                      <Menu.Item value="profile" color="white">Profile</Menu.Item>
                    </Link>
                    <Menu.Item value="logout" color="white">Logout</Menu.Item>
                  </Box>
                ) : (
                  <Box>
                    <Link href="/login">
                      <Menu.Item value="login" color="white">Login</Menu.Item>
                    </Link>
                    <Link href="/sign-up">
                      <Menu.Item value="sign-up" color="white">Sign-Up</Menu.Item>
                    </Link>
                  </Box>
                )}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </VStack>
    </Box>
  );
}
