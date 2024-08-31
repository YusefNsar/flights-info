import AspectRatio from "@mui/joy/AspectRatio";
import JoyCard from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

export interface CardProps {
  image: string;
  title: string;
  subtitle: string;
  remarks: string[];
}

export const Card = (props: CardProps) => {
  return (
    <JoyCard variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={props.image} loading="lazy" alt="" />
        </AspectRatio>
      </CardOverflow>

      <CardContent>
        <Typography level="title-md">{props.title}</Typography>
        <Typography level="body-sm">{props.subtitle}</Typography>
      </CardContent>

      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          {props.remarks.map((remark, i) => (
            <>
              {i !== 0 && <Divider orientation="vertical" />}
              <Typography
                key={remark}
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: "md" }}
              >
                {remark}
              </Typography>
            </>
          ))}
        </CardContent>
      </CardOverflow>
    </JoyCard>
  );
};
