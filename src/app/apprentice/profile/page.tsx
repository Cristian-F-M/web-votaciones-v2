'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { UploadFile } from '@/components/UploadFile'
import X from '@/icons/X'
import { useUser } from '@/states/useUser'
import { useCallback, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ApprenticeProfilePage() {
	const { user } = useUser((state) => state)
	const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
	const [confirmedImage, setConfirmedImage] = useState(false)

	const handleChangeProfileImage = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			if (!file) return

			const url = URL.createObjectURL(file)
			setProfileImageUrl(url)

			setConfirmedImage(false)
		},
		[]
	)

	const apprenticeImageUrl = `${API_URL}/user/image/${user?.id}`

	return (
		<>
			<link rel="stylesheet" href="/assets/css/form-ntw.css" />
			<main className="w-9/12 mx-auto mt-7">
				<form action="" className="size-full flex flex-row gap-6 justify-center">
					<div className="w-4/12 h-full border border-gray-400/60 shadow rounded p-7">
						<div className=" aspect-square w-full rounded">
							<a
								className="relative"
								href={profileImageUrl || apprenticeImageUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								{!confirmedImage && profileImageUrl && (
									<div
										className="absolute top-1 right-1 bg-red-600/70 p-1 rounded [&_svg]:size-5"
										onClick={(event) => {
											event.preventDefault()
											event.stopPropagation()
											setProfileImageUrl(null)
										}}
									>
										<X />
									</div>
								)}
								<img
									className="size-full object-cover rounded border-2 border-(--color)/70"
									src={profileImageUrl || apprenticeImageUrl}
									alt={`Foto de el usuario ${user?.name}`}
								/>
							</a>
						</div>
						<div className="mt-5 h-10">
							{(!profileImageUrl || (profileImageUrl && confirmedImage)) && (
								<UploadFile
									id="profile-image"
									name="profile-image"
									text="Cambiar foto"
									inputProps={{ accept: 'image/*' }}
									onChange={handleChangeProfileImage}
								/>
							)}

							{!confirmedImage && profileImageUrl && (
								<div className="flex flex-row gap-3 text-sm [&_button]:mb-0 size-full">
									<Button
										className="bg-transparent border border-gray-500/70 hover:bg-gray-300/70 "
										showLoader={false}
										onClick={() => {
											setProfileImageUrl(null)
											setConfirmedImage(false)
										}}
									>
										Cancelar
									</Button>
									<Button
										showLoader={false}
										onClick={() => {
											setConfirmedImage(true)
										}}
									>
										Confirmar
									</Button>
								</div>
							)}
						</div>
					</div>
					<div className="grid grid-cols-2 space-y-10 gap-x-7 w-8/12 border border-gray-400/60 shadow rounded px-9 py-10">
						<Input
							label="Nombre"
							name="name"
							id="name"
							type="text"
							error={null}
							value={user?.name}
						/>
						<Input
							label="Apellido"
							name="lastname"
							id="lastname"
							type="text"
							error={null}
							value={user?.lastname}
						/>
						<Select
							error={null}
							items={user ? [user.typeDocumentUser] : null}
							label="Tipo de documento"
							id="typeDocumentCode"
							name="typeDocumentCode"
							required
							selectedItem={user?.typeDocumentUser.code}
							disabled
						/>
						<Input
							label="Documento"
							name="document"
							id="document"
							type="number"
							error={null}
							value={user?.document}
						/>
						<Input
							label="Telefono"
							name="phone"
							id="phone"
							type="number"
							error={null}
							value={user?.phone}
						/>
						<Input
							label="Correo"
							name="email"
							id="email"
							type="email"
							error={null}
							value={user?.email}
						/>
						<Select
							disabled
							label="Rol"
							name="role"
							id="role"
							error={null}
							items={user ? [user.roleUser] : null}
							selectedItem={user?.roleUser.code}
						/>
						<Button
							className="col-span-2 mb-0"
							showLoader={false}
							onClick={() => {}}
							type="submit"
						>
							Actualizar
						</Button>
					</div>
				</form>
			</main>
		</>
	)
}
