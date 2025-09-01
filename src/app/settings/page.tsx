"use client";

import Sidebar from "@/components/Sidebar";
import { Box, Tabs, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function SettingsPage() {
  const [value, setValue] = useState<string | null>("theme");

  return (
    <Box backgroundColor="gray.800" display="flex" ml={{ base: "16", md: "20" }} color="white">
      <Sidebar />
      <VStack w="full" minH="dvh" my="7" px="10" mb="5">
        <Text color="white" fontSize="xl">Settings</Text>
        <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)} colorPalette="blue" width="xl">
          <Tabs.List>
            <Tabs.Trigger value="theme" colorPalette="blue" color="white">Theme</Tabs.Trigger>
            <Tabs.Trigger value="notifications" colorPalette="blue" color="white">Notifications</Tabs.Trigger>
            <Tabs.Trigger value="profile" colorPalette="blue" color="white">Profile</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="theme">First Panel</Tabs.Content>
          <Tabs.Content value="notifications">Second Panel</Tabs.Content>
          <Tabs.Content value="profile">Third Panel</Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Box>
  )
}