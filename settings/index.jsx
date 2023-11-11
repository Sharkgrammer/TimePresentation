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

                <Select
                    label={`Display Mode`}
                    settingsKey="darkmodeSet"
                    options={[
                        {name: "Light Mode", desc: "Test", value: "0"},
                        {name: "Darkish Mode", desc: "Test", value: "1"},
                        {name: "Dark Mode", desc: "Test", value: "2"},
                    ]}
                    renderItem={
                        (option) =>
                            <TextImageRow
                                label={option.name}
                                sublabel={option.desc}
                            />
                    }
                />


                <TextInput
                    label="Change Title Text"
                    action="Set Text"
                    placeholder="Type here..."
                    settingsKey="titleSet"
                    maxLength="11"
                />

            </Section>
        </Page>
    );
}

registerSettingsPage(FlagSettings);
