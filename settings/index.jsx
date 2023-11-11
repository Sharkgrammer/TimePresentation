function FlagSettings() {
    return (
        <Page>
            <Section
                description={
                    <Text>
                        These settings allow you to change the title and theme of Slidelike Presentation
                    </Text>
                }>

                <Select
                    label={`Display Mode`}
                    settingsKey="darkmodeSet"
                    options={[
                        {name: "Light Mode", desc: "All light colours", value: "0"},
                        {name: "Darkish Mode", desc: "Mostly dark colours with the central slide light", value: "1"},
                        {name: "Dark Mode", desc: "All dark colours", value: "2"},
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
                />

            </Section>
        </Page>
    );
}

registerSettingsPage(FlagSettings);
