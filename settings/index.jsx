function SlideSettings(props) {

    const timeArray24 = [
        {name: "00:00"}, {name: "00:30"}, {name: "01:00"}, {name: "01:30"}, {name: "02:00"},
        {name: "02:30"}, {name: "03:00"}, {name: "03:30"}, {name: "04:00"}, {name: "04:30"},
        {name: "05:00"}, {name: "05:30"}, {name: "06:00"}, {name: "06:30"}, {name: "07:00"},
        {name: "07:30"}, {name: "08:00"}, {name: "08:30"}, {name: "09:00"}, {name: "09:30"},
        {name: "10:00"}, {name: "10:30"}, {name: "11:00"}, {name: "11:30"}, {name: "12:00"},
        {name: "12:30"}, {name: "13:00"}, {name: "13:30"}, {name: "14:00"}, {name: "14:30"},
        {name: "15:00"}, {name: "15:30"}, {name: "16:00"}, {name: "16:30"}, {name: "17:00"},
        {name: "17:30"}, {name: "18:00"}, {name: "18:30"}, {name: "19:00"}, {name: "19:30"},
        {name: "20:00"}, {name: "20:30"}, {name: "21:00"}, {name: "21:30"}, {name: "22:00"},
        {name: "22:30"}, {name: "23:00"}, {name: "23:30"}
    ];

    const timeArray12 = [
        {name: "12:00 AM"}, {name: "12:30 AM"}, {name: "1:00 AM"}, {name: "1:30 AM"}, {name: "2:00 AM"},
        {name: "2:30 AM"}, {name: "3:00 AM"}, {name: "3:30 AM"}, {name: "4:00 AM"}, {name: "4:30 AM"},
        {name: "5:00 AM"}, {name: "5:30 AM"}, {name: "6:00 AM"}, {name: "6:30 AM"}, {name: "7:00 AM"},
        {name: "7:30 AM"}, {name: "8:00 AM"}, {name: "8:30 AM"}, {name: "9:00 AM"}, {name: "9:30 AM"},
        {name: "10:00 AM"}, {name: "10:30 AM"}, {name: "11:00 AM"}, {name: "11:30 AM"}, {name: "12:00 PM"},
        {name: "12:30 PM"}, {name: "1:00 PM"}, {name: "1:30 PM"}, {name: "2:00 PM"}, {name: "2:30 PM"},
        {name: "3:00 PM"}, {name: "3:30 PM"}, {name: "4:00 PM"}, {name: "4:30 PM"}, {name: "5:00 PM"},
        {name: "5:30 PM"}, {name: "6:00 PM"}, {name: "6:30 PM"}, {name: "7:00 PM"}, {name: "7:30 PM"},
        {name: "8:00 PM"}, {name: "8:30 PM"}, {name: "9:00 PM"}, {name: "9:30 PM"}, {name: "10:00 PM"},
        {name: "10:30 PM"}, {name: "11:00 PM"}, {name: "11:30 PM"}
    ];

    return (
        <Page>
            <Section
                title={<Text bold align="center">Core Settings</Text>}
                description={<Text>These settings allow you to change the title and theme of Slidelike
                    Presentation and are always available</Text>}>

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
                    title="Change Title Text"
                    placeholder="Type here..."
                    settingsKey="titleSet"
                    default="test"
                />


            </Section>

            <Section
                title={<Text bold align="center">Auto Dark Mode Settings</Text>}
                description={<Text>Auto Dark Mode will only work if your theme is set to light mode and both times are
                    set to something</Text>}>

                <Toggle
                    label={`Auto Dark Mode: ${props.settings.toggleModeSelects === 'true' ? 'Yes' : 'No'}`}
                    settingsKey="toggleModeSelects"
                />

                <Toggle
                    label={`Auto Time Mode: ${props.settings.toggleModeHour === 'true' ? '12hr' : '24hr'}`}
                    settingsKey="toggleModeHour"
                    disabled={!(props.settings.toggleModeSelects === "true")}
                />

                <Select
                    label={`Dark Mode On`}
                    settingsKey="darkmodeOnTime"
                    options={props.settings.toggleModeHour === "true" ? timeArray12 : timeArray24}
                    disabled={!(props.settings.toggleModeSelects === "true")}
                />


                <Select
                    label={`Dark Mode Off`}
                    settingsKey="darkmodeOffTime"
                    options={props.settings.toggleModeHour === "true" ? timeArray12 : timeArray24}
                    disabled={!(props.settings.toggleModeSelects === "true")}
                />

            </Section>

        </Page>
    );
}

registerSettingsPage(SlideSettings);
