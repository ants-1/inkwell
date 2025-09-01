import { Box, VStack, Menu, Portal } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip"
import { Bell, NotepadText, UsersRound, Wrench, UserRound } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { href: "/notes", icon: NotepadText, tooltip: "My Notes" },
  { href: "/teams", icon: UsersRound, tooltip: "Teams" },
  { href: "/notifications", icon: Bell, tooltip: "Notifications" },
  { href: "/settings", icon: Wrench, tooltip: "Settings" },
];

export default function Sidebar() {
  const isAuth = true;

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
        {sidebarItems.map(({ href, icon: Icon, tooltip }, i) => (
          <Link key={i} href={href}>
            <Tooltip content={tooltip}>
              <Box boxSize={{ base: 10, md: 11 }} p="2" _hover={{ backgroundColor: "gray.900" }} rounded="xl">
                <Icon color="white" height="full" width="full" />
              </Box>
            </Tooltip>
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
