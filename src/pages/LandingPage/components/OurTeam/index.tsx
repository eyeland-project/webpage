import Section from "./Section";
import Title from "@components/Title";

function OurTeam() {
    return (
        <div className="mb-10">
            <Title title={"Nuestro equipo"} textColor={"text-black"} />
            <Section
                title={"Profesores"}
                people={[
                    {
                        name: "Dr. Miguel Jimeno Paba",
                        img: "https://media.licdn.com/dms/image/C5603AQGEG3qFyxN2Uw/profile-displayphoto-shrink_100_100/0/1658951618029?e=1682553600&v=beta&t=5VH8dKbyqW6PaSbflk_k5GjEQLhIA5U9MQJ5i-PYJNs",
                        link: "https://github.com/majimeno",
                    },
                    {
                        name: "Mtr. Karen Villalba Ramos",
                        img: "https://scholar.googleusercontent.com/citations?view_op=view_photo&user=Dse7Za4AAAAJ&citpid=21",
                        link: "https://scholar.google.com/citations?user=Dse7Za4AAAAJ&hl=es",
                    },
                    {
                        name: "PhD. Heidy Robles",
                        img: "https://media.licdn.com/dms/image/D4E03AQGFTuTJEvKcog/profile-displayphoto-shrink_100_100/0/1674572891630?e=1682553600&v=beta&t=yARSPOMHfydrilACP0TQS7sJM4eWzN3SG7K-EEvCMwc",
                        link: "https://www.linkedin.com/in/heydy-selene-robles-noriega-58b73236/?locale=en_US",
                    },
                ]}
            />
            <Section
                title={"Diseñadores"}
                people={[
                    {
                        name: "Wendy Florian Pacheco",
                        img: "https://media.licdn.com/dms/image/D4E03AQFpzXhp8Bm81Q/profile-displayphoto-shrink_100_100/0/1666830749986?e=1682553600&v=beta&t=wmSKZ0eJecmwUmhV65LUz5WyH7x81vXMSV6EZSQur8g",
                        link: "https://www.linkedin.com/in/diwendyflorian/",
                    },
                ]}
            />
            <Section
                title={"Desarrolladores"}
                people={[
                    {
                        name: "Camilo J. Sinning Lopez",
                        img: "https://avatars.githubusercontent.com/u/61607058?v=4",
                        link: "https://github.com/CamiloSinningUN",
                    },
                    {
                        name: "Breynner S. Hurtado Acuña",
                        img: "https://avatars.githubusercontent.com/u/61608216?v=4",
                        link: "https://github.com/breynner1",
                    },
                    {
                        name: "Leonardo D. Lizcano Pinto",
                        img: "https://avatars.githubusercontent.com/u/74639893?v=4",
                        link: "https://github.com/LeoLizc",
                    },
                    {
                        name: "Leonardo D. Vergara Marquez",
                        img: "https://avatars.githubusercontent.com/u/73978713?v=4",
                        link: "https://github.com/leovergaramarq"
                    }
                ]}
            />
        </div>
    );
}

export default OurTeam;
