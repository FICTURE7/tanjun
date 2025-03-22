export interface CardHeaderProps {
  title: string;
  description?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="lowercase font-bold text-3xl mb-4">{title}</h1>
      {description && <p className="mb-6">{description}</p>}
    </div>
  )
}

export default CardHeader;
