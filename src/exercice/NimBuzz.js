import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroup, FormControl, Image } from 'react-bootstrap';

const NimBuzz = () => {
	const [ data, setData ] = useState([ '0', '1', '2' ]);
	const [ nim, setNim ] = useState();
	const [ buzz, setBuzz ] = useState();
	const [ nombre, setNombre ] = useState();
	const [ color, setColor ] = useState();

	const [ numbersequence, setNumberSequence ] = useState(0);

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (data) => setData(data);

	useEffect(
		() => {
			const ColorArray = [];
			let i;
			let count3 = 0;
			let count5 = 0;
            const countArr= [];
			for (i = parseInt(data.firstnumber); i <= parseInt(data.lastnumber); i++) {
				// Increment count3 by 1
				count3++;

				// Increment count5 by 1
				count5++;

				// Initialize a boolean variable
				// to check if none of the
				// condition matches
				let flag = false;

				// Check if the value of count3
				// is equal to 3
				if (count3 == 3) {
                    countArr.push('NIM')
                    ColorArray.push('#4CAF50')
					// Reset count3 to 0, and
					// set flag as True
					count3 = 0;
					flag = true;
				}

				// Check if the value of count5
				// is equal  to 5
				if (count5 == 5) {
                    countArr.push('Buzz')
                    ColorArray.push('#607d8b')

					// Reset count5 to 0, and
					// set flag as True
					count5 = 0;
					flag = true;
				}

                if (count3 == 3 && count5 == 5) {
                    countArr.push('NIMbuzz')
                    ColorArray.push('#ff9800')
					// Reset count3 to 0, and
					// set flag as True
					count3 = 0;
					flag = true;
				}

				// If none of the condition matches
				if (!flag) {
                    countArr.push(i)
                    ColorArray.push('#f44336')

				}
                setNim(countArr);
                setColor(ColorArray);

			}
		},
		[ data ]
	);

	return (
		<div className="container-fluid m-0 p-0" style={{ height: '100vh' }}>
			<div className="row m-0 p-0">
				<form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12 d-flex justify-content-center p-0 m-0">
                     <div className="col-8 d-flex justify-space-between mb-5">
						<div className="col-4 mt-5">
							<Image
								style={{ width: 250, height: 250 }}
								src="http://www.netinfosmedias.com/media/images/icones/logo-netinfosmedias-seul-tampon.png"
								fluid
							/>
						</div>

						<div className="col-6 mt-5">
							<h1
								className="text-center"
								style={{ color: '#ED7D31', fontWeight: 'bold', position: 'relative' }}
							>
								Le test - Nimbuzz
							</h1>
							<div className="col-12 mt-5">
								<InputGroup className="mb-3">
									<InputGroup.Text id="basic-addon1">Nombre de début</InputGroup.Text>
									<FormControl
										placeholder="Nombre de début"
										aria-label="firstnumber"
										aria-describedby="basic-addon1"
										{...register('firstnumber')}
									/>
								</InputGroup>
							</div>
							<div className="col-12">
								<InputGroup className="mb-3">
									<InputGroup.Text id="basic-addon1">Nombre de fin</InputGroup.Text>
									<FormControl
										placeholder="Nombre de fin"
										aria-label="lastnumber"
										aria-describedby="basic-addon1"
										{...register('lastnumber')}
									/>
								</InputGroup>
							</div>
							<div className="col-12 d-flex justify-content-center">
								<button
									style={{
										width: 150,
										height: 45,
										backgroundColor: 'green',
										borderRadius: 50,
										color: 'white',
										alignSelf: 'center'
									}}
									onClick={onSubmit}
								>
									Envoyer
								</button>
							</div>
						</div>
					</div>   
                    </div>
					
				</form>
                <div className="col-12 row d-flex justify-content-center">
                <div className="col-10 row ">
					{nim ? (nim.map((item, index) => {
						return (
								<div key={index} style={{width: 50, height:50}} className="">{item}</div>
							);
					})
				) : ( <h1 className="text-center">Choisissez une suite de nombre entre 1 et 1000.</h1>)}
				</div>    
                </div>
				
			</div>
		</div>
	);
};

export default NimBuzz;
