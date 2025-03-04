interface infoTitleProps {
  contenido: string | number;
}

const InfoTitle = ({ contenido }: infoTitleProps) => {
  return (
    <h2> 
      {contenido}
    </h2>
  );
}

export default InfoTitle;