function FlagSettings() {
    return (
        <Page>
            <Section
                title={
                    <Text bold align="center">
                        Presentation Face Settings
                    </Text>
                }

                description={
                    <Text>
                        Some kinda text describing what the select options are
                    </Text>
                }>

                <TextInput
                    label="Change Title Text"
                    action="Set Text"
                    placeholder="Type here..."
                    settingsKey="titleSet"
                />

            </Section>
        </Page>
    );
}

registerSettingsPage(FlagSettings);
