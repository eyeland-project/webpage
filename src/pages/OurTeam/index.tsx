import NavBar from '@components/NavBar';
import Section from '@pages/OurTeam/components/Section';
import Title from '@components/Title';
import Footer from '@components/Footer';

function OurTeam() {
	return (
		<>
			<NavBar />
			<div className="mb-10 mt-40">
				<Title title={'Nuestro equipo'} textColor={'text-black'} />
				<Section
					title={'Profesores'}
					people={[
						{
							name: 'Dr. Miguel Jimeno Paba',
							img: 'https://media.licdn.com/dms/image/C5603AQGEG3qFyxN2Uw/profile-displayphoto-shrink_100_100/0/1658951618029?e=1682553600&v=beta&t=5VH8dKbyqW6PaSbflk_k5GjEQLhIA5U9MQJ5i-PYJNs',
							link: 'https://github.com/majimeno'
						},
						{
							name: 'Mtr. Karen Villalba Ramos',
							img: 'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=Dse7Za4AAAAJ&citpid=21',
							link: 'https://scholar.google.com/citations?user=Dse7Za4AAAAJ&hl=es'
						},
						{
							name: 'Ph. D. Heidy Robles',
							img: 'https://www.uninorte.edu.co/documents/13629531/13702112/Heidy+Robles+-+Profesor+-+Lenguas+Extranjeras.png/73c25a38-17de-64cd-a02a-b457a1a87a32?t=1653334063089&download=true',
							link: 'https://www.uninorte.edu.co/web/instituto-de-idiomas/nuestros-docentes'
						},
						{
							name: 'Mtr. Elkin Villanueva',
							img: 'https://www.uninorte.edu.co/documents/13629531/13702112/Elkin+Villanueva+-+Profesor+-+Lenguas+Extranjeras.png/a5e76f5c-1351-cbc7-4962-63e23db877fd?t=1653330992006&download=true',
							link: 'https://www.uninorte.edu.co/web/instituto-de-idiomas/nuestros-docentes'
						},
						{
							name: 'MA. Martha Delgado',
							img: 'https://www.uninorte.edu.co/documents/13629531/13702112/Martha+Delgado+-+Profesor+-+Lenguas+Extranjeras.png/dfec13f6-f30b-ea26-861f-19e0eaa1f677?t=1653332035694&download=true',
							link: 'https://www.uninorte.edu.co/web/instituto-de-idiomas/nuestros-docentes'
						},
						{
							name: 'Mtr. Conor Keogh',
							img: 'https://www.uninorte.edu.co/documents/13629531/13702112/Conor+Keogh+-+Profesor+-+Lenguas+Extranjeras.png/f2fec2c3-f855-5f07-570f-102943a0d855?t=1653335811397&download=true',
							link: 'https://www.uninorte.edu.co/web/instituto-de-idiomas/nuestros-docentes'
						},
						{
							name: 'Dra. Adriana Maria Perez De Ramirez',
							img: 'https://www.uninorte.edu.co/documents/13629531/13702112/Adriana+Perez+-+Profesor+-+Espa%C3%B1ol.png/06fb46ad-010a-7cee-8b9e-dd327052df51?t=1653399348964&download=true',
							link: 'https://www.uninorte.edu.co/web/instituto-de-idiomas/nuestros-docentes'
						}
					]}
				/>
				<Section
					title={'Diseñadores'}
					people={[
						{
							name: 'Wendy Florian Pacheco',
							img: 'https://media.licdn.com/dms/image/D4E03AQFpzXhp8Bm81Q/profile-displayphoto-shrink_100_100/0/1666830749986?e=1682553600&v=beta&t=wmSKZ0eJecmwUmhV65LUz5WyH7x81vXMSV6EZSQur8g',
							link: 'https://www.linkedin.com/in/diwendyflorian/'
						}
					]}
				/>
				<Section
					title={'Desarrolladores'}
					people={[
						{
							name: 'Camilo J. Sinning Lopez',
							img: 'https://avatars.githubusercontent.com/u/61607058?v=4',
							link: 'https://github.com/CamiloSinningUN'
						},
						{
							name: 'Breynner S. Hurtado Acuña',
							img: 'https://avatars.githubusercontent.com/u/61608216?v=4',
							link: 'https://github.com/breynner1'
						},
						{
							name: 'Leonardo D. Lizcano Pinto',
							img: 'https://avatars.githubusercontent.com/u/74639893?v=4',
							link: 'https://github.com/LeoLizc'
						},
						{
							name: 'Leonardo D. Vergara Marquez',
							img: 'https://avatars.githubusercontent.com/u/73978713?v=4',
							link: 'https://github.com/leovergaramarq'
						}
					]}
				/>
			</div>
			<Footer />
		</>
	);
}

export default OurTeam;
