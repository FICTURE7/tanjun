import Alert from "./Alert";

export interface CardHeaderProps {
  title: string;
  description?: string;
  error?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, description, error }) => {
  return (
    <div>
      <h1 className="lowercase font-bold text-3xl mb-4">{title}</h1>
      {description && (<p className="mb-6">{description}</p>)}
      {error && (
        <div className="mb-6">
          <Alert>
            <span>{error}</span>
          </Alert>
        </div>
      )}
    </div>
  )
}

export default CardHeader;
