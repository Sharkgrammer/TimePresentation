function FlagSettings() {
    return (
        <Page>
            <Section
                title={
                    <Text bold align="center">
                        Face face
                    </Text>
                }

                description={
                    <Text>
                        Some kinda text describing what the select options are
                    </Text>
                }>

                <TextInput
                    label="Example"
                    title="Text Input"
                    action="Set Text"
                    placeholder="Type something"
                    settingsKey="titleSet"
                />

            </Section>
        </Page>
    );
}

registerSettingsPage(FlagSettings);
