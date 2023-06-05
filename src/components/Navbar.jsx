

export default function Navbar() {
	return (
		<div className="w-full p-8 bg-[#1B1533] text-[#CBDF1E]">
			<div className="flex justify-between font-bold">
				<a href="/" className="ml-9">CRUD App</a>
				<ul className="flex gap-8 mx-9">
					<li >
						<a href="/">Users</a>
					</li>
					<li >
						<a href="create">Create</a>
					</li>
				</ul>
			</div>
		</div>
	);
}